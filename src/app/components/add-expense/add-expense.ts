import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersonalExpenseService } from '../../services/personal-expense-service.service';
import { NgClass } from '@angular/common';
import { PersonalExpense } from '../../models/personal-expense';
import { JwtUtils } from '../../utils/jwtUtils';

@Component({
  selector: 'app-add-expense',
  imports: [RouterLink, NgClass, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense implements OnInit {

  addExpenseForm!: FormGroup; 
  errorMessage: string = '';
  categories = [
    {
      label: 'Borrow',
      value: 'Borrow',
      icon: 'payments'
    },
    {
      label: 'Lend',
      value: 'Lend',
      icon: 'money_bag'
    },
    {
      label: 'Dining / Order',
      value: 'Food',
      icon: 'restaurant'
    },
    {
      label: 'Travel',
      value: 'Travel',
      icon: 'flight_takeoff'
    },
    {
      label: 'Utilities',
      value: 'utilities',
      icon: 'bolt'
    },
    {
      label: 'Shopping',
      value: 'Shopping',
      icon: 'shopping_bag'
    },
    {
      label: 'Other',
      value: 'Other',
      icon: 'more_horiz'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private personalExpenseService: PersonalExpenseService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.addExpenseForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern("^[a-zA-Z\\s]*$")]],
      amount: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      category: ['Food'],
      description:['', [Validators.pattern("^[a-zA-Z\\s]+$")]]
    });
  }

  selectCategory(category: string) {
    // console.log(this.addExpenseForm.get('category')?.value())
    this.addExpenseForm.controls['category'].setValue(category);
    // console.log(this.addExpenseForm.get('category')?.value);
    // console.log(category);
  }

  addExpense(){
    var expense = {} as PersonalExpense;
    expense.amount = this.addExpenseForm.get('amount')?.value;
    expense.unsettledAmount = this.addExpenseForm.get('amount')?.value;
    expense.category = this.addExpenseForm.get('category')?.value;
    expense.description = this.addExpenseForm.get('description')?.value;
    if(expense.category == 'Borrow'){
      expense.paidBy = this.addExpenseForm.get('name')?.value;
      expense.paidTo = JwtUtils.getUsername() as string;
    }else {
      expense.paidBy = JwtUtils.getUsername() as string;
      expense.paidTo = this.addExpenseForm.get('name')?.value;
    }
    this.personalExpenseService.addExpense(expense).subscribe({
      next: expense => {
        console.log(expense);
      },
      error: err => this.errorMessage = err,
      complete: () => {
        this.addExpenseForm.reset();
        this.router.navigate(['/dashboard/expenses']);
      },
    })
  }
}
