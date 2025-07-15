import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskService } from '../../core/task.service';
import { Task } from '../../models/task.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    DragDropModule,
    TaskFormComponent,
    TaskListComponent
  ],
  providers: [TaskService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tasks$: Observable<Task[]>;
  allTasks: Task[] = [];

  editedTask: Task | null = null;
  showModal = false;

  // Фильтры
  statusFilter: string = 'all';
  titleFilter: string = '';

  // Фильтрованные списки
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit() {
    this.tasks$.subscribe(tasks => {
      this.allTasks = tasks;
      this.applyFilters();
    });
  }

  applyFilters() {
    const filtered = this.allTasks.filter(task =>
      (this.statusFilter === 'all' || task.status === this.statusFilter) &&
      task.title.toLowerCase().includes(this.titleFilter.toLowerCase())
    );

    this.todoTasks = filtered.filter(t => t.status === 'todo');
    this.inProgressTasks = filtered.filter(t => t.status === 'in-progress');
    this.doneTasks = filtered.filter(t => t.status === 'done');
  }

  // отслеживаем изменения фильтров вручную
  onFilterChange() {
    this.applyFilters();
  }

  onTaskCreated(task: Task) {
    this.taskService.addTask(task);
  }

  onDeleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  openEditModal(task: Task) {
    this.editedTask = task;
    this.showModal = true;
  }

  closeModal() {
    this.editedTask = null;
    this.showModal = false;
  }

  onTaskEdited(task: Task) {
    this.taskService.updateTask(task);
    this.closeModal();
  }



// внутри класса HomeComponent
drop(event: CdkDragDrop<Task[]>, newStatus: Task['status']) {
  if (event.previousContainer === event.container) {
    return;
  }

  const task = event.previousContainer.data[event.previousIndex];
  const updatedTask: Task = { ...task, status: newStatus };

  this.taskService.updateTask(updatedTask);

  transferArrayItem(
    event.previousContainer.data,
    event.container.data,
    event.previousIndex,
    event.currentIndex
  );
}


}
