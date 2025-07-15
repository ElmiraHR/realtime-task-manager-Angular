import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { TaskStatus, Task } from '../../models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() taskCreated = new EventEmitter<Task>();

  form: FormGroup;
  statusOptions: TaskStatus[] = ['todo', 'in-progress', 'done'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      status: ['todo', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const newTask: Task = {
        id: this.task?.id ?? uuidv4(),
        ...this.form.value,
      };
      this.taskCreated.emit(newTask);
      this.form.reset({ status: 'todo' });
      this.task = null; // очищаем редактируемую задачу
    }
  }
}
