import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { taskSchema, TaskFormData } from '@/lib/validations';
import { Task, useTasks, CreateTaskInput } from '@/hooks/useTasks';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
}

export function TaskDialog({ open, onOpenChange, task }: TaskDialogProps) {
  const { createTask, updateTask } = useTasks();
  const isEditing = !!task;

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: '', description: '', status: 'pending', priority: 'medium' },
  });

  useEffect(() => {
    if (task) {
      form.reset({ title: task.title, description: task.description || '', status: task.status, priority: task.priority });
    } else {
      form.reset({ title: '', description: '', status: 'pending', priority: 'medium' });
    }
  }, [task, form]);

  const handleSubmit = async (data: TaskFormData) => {
    const input: CreateTaskInput = {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
    };
    
    if (isEditing) {
      await updateTask.mutateAsync({ id: task.id, ...input });
    } else {
      await createTask.mutateAsync(input);
    }
    onOpenChange(false);
    form.reset();
  };

  const isLoading = createTask.isPending || updateTask.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Create Task'}</DialogTitle>
          <DialogDescription>{isEditing ? 'Make changes to your task.' : 'Add a new task to your list.'}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter task title..." {...form.register('title')} />
            {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter task description..." rows={3} {...form.register('description')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.watch('status')} onValueChange={(value) => form.setValue('status', value as TaskFormData['status'])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={form.watch('priority')} onValueChange={(value) => form.setValue('priority', value as TaskFormData['priority'])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
