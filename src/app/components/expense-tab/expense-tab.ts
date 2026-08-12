import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PersonalExpenseService } from '../../services/personal-expense-service.service';
import { Observable } from 'rxjs';
import { PersonalExpense } from '../../models/personal-expense';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-tab',
  imports: [RouterLink, AsyncPipe, DatePipe],
  templateUrl: './expense-tab.html',
  styleUrl: './expense-tab.css',
})
export class ExpenseTab implements OnInit{

  expenseList$!: Observable<PersonalExpense[]>;

  constructor(
    private formBuilder: FormBuilder,
    private personalExpenseService: PersonalExpenseService,
  ){}

  ngOnInit(): void {
    this.getExpenseList();
  }

  getExpenseList(){
    this.expenseList$ = this.personalExpenseService.getExpenseList();
  }
}
