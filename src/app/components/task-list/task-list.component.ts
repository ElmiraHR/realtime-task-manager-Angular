import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() delete = new EventEmitter<string>(); // id задачи

  onDelete(id: string) {
    this.delete.emit(id);
  }
  @Output() edit = new EventEmitter<Task>();

onEdit(task: Task) {
  this.edit.emit(task);
}

}
