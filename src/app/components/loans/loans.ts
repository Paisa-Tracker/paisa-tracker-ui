import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { LoanExpenseService } from '../../services/loan-expense.service';
import { LoanExpense } from '../../models/loan-expense';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-loans',
  imports: [RouterLink, RouterOutlet, AsyncPipe, DatePipe, DecimalPipe],
  templateUrl: './loans.html',
  styleUrl: './loans.css',
})
export class Loans implements OnInit {

  loanExpenseList$!: Observable<LoanExpense[]>;
  errorMessage: string = '';

  constructor(private loanExpenseService: LoanExpenseService) { }

  ngOnInit(): void {
    this.getLoanExpenseList();
  }

  getLoanExpenseList() {
    console.log("getLoanExpenseList() method called");
    this.loanExpenseList$ = this.loanExpenseService.getLoanExpenseList();
  }

  getCurrentEmiDate(emiStartDate: string) {
    const start: Date = new Date(emiStartDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthsDiff =
      (today.getFullYear() - start.getFullYear()) * 12 +
      (today.getMonth() - start.getMonth());

    let next = new Date(start);
    next.setMonth(start.getMonth() + monthsDiff);

    if (next < today) {
      next.setMonth(next.getMonth() + 1);
    }

    return next;
  }

  getCurrentEmiTerm(emiStartDate: string, tenure: number) {
    const start = new Date(emiStartDate);
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (today < start) {
      return 0;
    }

    let months =
      (today.getFullYear() - start.getFullYear()) * 12 +
      (today.getMonth() - start.getMonth());

    if (today.getDate() < start.getDate()) {
      months--;
    }

    const paidEmis = months + 1;

    return Math.min(Math.max(paidEmis, 0), tenure);
  }

  getTotalRepaymentAmount(loan: LoanExpense){
    const interestPortion = loan.totalAmount * (loan.tenure / 12) * (loan.interestRate / 100);
    return loan.totalAmount + interestPortion + loan.processingFee;
  }

  getRemainingAmount(loan: LoanExpense) {
    const emisPaid = this.getCurrentEmiTerm(loan.emiStartDate, loan.tenure);
    return this.getTotalRepaymentAmount(loan) - (emisPaid * loan.emiAmount);
  }

  getPaidPercent(loan: LoanExpense) {
    return 100 - ((this.getRemainingAmount(loan) / this.getTotalRepaymentAmount(loan)) * 100);
  }


}