import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

const LOCAL_STORAGE_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());
  tasks$ = this.tasksSubject.asObservable();

  private loadTasks(): Task[] {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  }

  private saveTasks(tasks: Task[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }

  addTask(task: Task) {
    const updated = [...this.tasksSubject.value, task];
    this.tasksSubject.next(updated);
    this.saveTasks(updated);
  }

  deleteTask(id: string) {
    const updated = this.tasksSubject.value.filter(t => t.id !== id);
    this.tasksSubject.next(updated);
    this.saveTasks(updated);
  }

  updateTask(updatedTask: Task) {
    const updated = this.tasksSubject.value.map(t =>
      t.id === updatedTask.id ? updatedTask : t
    );
    this.tasksSubject.next(updated);
    this.saveTasks(updated);
  }
}
