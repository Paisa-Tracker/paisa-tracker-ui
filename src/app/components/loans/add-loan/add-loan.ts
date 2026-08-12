import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { LoanExpenseService } from '../../../services/loan-expense.service';
import { LoanExpense } from '../../../models/loan-expense';

@Component({
  selector: 'app-add-loan',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './add-loan.html',
  styleUrl: './add-loan.css',
})
export class AddLoan implements OnInit {

  loanForm!: FormGroup;
  loanExpense: LoanExpense = {} as LoanExpense;
  errorMessage: string = '';

  get name() { return this.loanForm.get('name'); }
  get lenderName() { return this.loanForm.get('lenderName'); }
  get category() { return this.loanForm.get('category'); }
  get totalAmount() { return this.loanForm.get('totalAmount'); }
  get emiAmount() { return this.loanForm.get('emiAmount'); }
  get tenure() { return this.loanForm.get('tenure'); }
  get processingFee() { return this.loanForm.get('processingFee'); }
  get interestRate() { return this.loanForm.get('interestRate'); }
  get disbursedDate() { return this.loanForm.get('disbursedDate'); }
  get emiStartDate() { return this.loanForm.get('emiStartDate'); }
  get interestPortion() { return (this.totalAmount?.value * (this.tenure?.value / 12) * (this.interestRate?.value / 100)) };
  get totalRepayment() { return this.totalAmount?.value + this.interestPortion + this.processingFee?.value };

  constructor(
    private formBuilder: FormBuilder, 
    private loanExpenseService: LoanExpenseService
  ){ }

  ngOnInit(): void {
    this.loanForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern("^[a-zA-Z\\s]*$")]],
      lenderName:['', [Validators.required, Validators.pattern("^[a-zA-Z\\s]*$")]],
      category: ['', [Validators.required]],
      totalAmount: ['', [Validators.required]],
      emiAmount: ['', [Validators.required]],
      tenure: ['', [Validators.required]],
      processingFee: ['', [Validators.required]],
      interestRate: ['', [Validators.required, Validators.max(100)]],
      disbursedDate: ['', [Validators.required]],
      emiStartDate: ['', [Validators.required]]
    });
  }

  addLoan(){
    var loanExpense = {} as LoanExpense;
    loanExpense.name = this.name?.value;
    loanExpense.lenderName = this.lenderName?.value;
    loanExpense.category = this.category?.value;
    loanExpense.totalAmount = this.totalAmount?.value;
    loanExpense.emiAmount = this.emiAmount?.value;
    loanExpense.tenure = this.tenure?.value;
    loanExpense.processingFee = this.processingFee?.value;
    loanExpense.interestRate = this.interestRate?.value;
    loanExpense.disbursedDate = this.disbursedDate?.value;
    loanExpense.emiStartDate = this.emiStartDate?.value;

    this.loanExpenseService.addLoanExpense(loanExpense).subscribe({
      next: res => console.log(res),
      error: err => this.errorMessage = err,
      complete: () => {
        this.loanForm.reset();
      }
    });
  }

}
