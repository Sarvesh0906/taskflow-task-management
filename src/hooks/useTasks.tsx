import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
}

export function useTasks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Task[];
    },
    enabled: !!user,
  });

  const createTask = useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: input.title,
          description: input.description || null,
          status: input.status,
          priority: input.priority,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({ title: 'Task created successfully' });
    },
    onError: (error) => {
      toast({ title: 'Failed to create task', description: error.message, variant: 'destructive' });
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, ...input }: UpdateTaskInput) => {
      const { data, error } = await supabase
        .from('tasks')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({ title: 'Task updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Failed to update task', description: error.message, variant: 'destructive' });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({ title: 'Task deleted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Failed to delete task', description: error.message, variant: 'destructive' });
    },
  });

  return {
    tasks: tasksQuery.data ?? [],
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    createTask,
    updateTask,
    deleteTask,
  };
}
