import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from '../interfaces/appState.interface';
import { Item } from '../interfaces/item.interface';
import * as PostsActions from "../store/actions"
import { isLoadingSelector, itemsSelector } from '../store/selectors';


@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  display = '0';
  firstNumber: number | null = null;
  secondNumber: number | null = null;
  minusOperator: boolean = false;

  changedNewNumber: boolean = false;

  newNumber: string = '0';
  action: string | null = null;

  isLoading$: Observable<boolean>;
  //error$: Observable<String | null>;
  //items$: Observable<Item[]>;
  items$: Observable<Item[]> = this.store.select(itemsSelector)


  constructor(private store: Store<AppStateInterface>) {

    this.isLoading$ = this.store.pipe(select(isLoadingSelector))

    //this.items$ = this.store.pipe(select(itemsSelector))
    //this.error$ = this.store.pipe(select(errorSelector))

    //this.isLoading$ = this.store.select(getCalculatorData);

  }

  ngOnInit(): void {
    this.store.dispatch(PostsActions.getCalculatorData())
  }

  addNumber(): void {
    const value: Item = { id: 1, value: "hello" };
    this.store.dispatch(PostsActions.addItem({ item: value }))
  }

  numClick(number: string): void {

    this.newNumber === '0' ? this.newNumber = number : this.newNumber += number;

    this.changedNewNumber = true;
    if (this.action) {
      this.display = `${this.display}${number}`;
    } else {
      this.display = this.newNumber
    }


  }

  pressOperator(action: string): void {

    if (this.firstNumber === null && this.changedNewNumber) {
      this.firstNumber = Number(this.newNumber);
      this.newNumber = '0'
      this.changedNewNumber = false;
    } else if (this.secondNumber === null && this.action !== null && this.changedNewNumber) {

      this.setSecondNumber();
      this.changedNewNumber = false;
    }

    if (this.action === null) {
      this.action = action;
      this.display = `${this.display}${action}`;
    }

    if (this.action === '*' || this.action === '÷') {
      if (action === '-') {
        this.display = `${this.display}${action}`;
        this.minusOperator = true;
      }
    }

    if (this.firstNumber !== null && this.secondNumber !== null && this.action !== null) {
      this.doCalculation(action)
    }

  }

  setSecondNumber(): void {
    if (this.minusOperator) {
      this.secondNumber = Number(this.newNumber) * (-1);
      this.minusOperator = false;
    } else {
      this.secondNumber = Number(this.newNumber);
    }
    this.newNumber = '0'
  }

  doCalculation(nextAction: string): void {

    if (nextAction === '=') {
      this.setSecondNumber();
      nextAction = ''
    }

    const a = this.firstNumber;
    const b = this.secondNumber;

    if (a !== null && b !== null) {

      let result = 0;
      if (this.action === '*') {
        result = a * b;
      }
      else if (this.action === '÷') {
        result = a / b;
      }
      else if (this.action === '+') {
        result = a + b;
      }
      else if (this.action === '-') {
        result = a - b;
      }

      result = +(result).toFixed(10)

      this.display = result.toString() + nextAction;
      this.firstNumber = result;
      this.secondNumber = null;
      this.changedNewNumber = false;

      const value: Item = { id: Math.random(), value: result.toString() };
      this.store.dispatch(PostsActions.addItem({ item: value }))
    }

    if (nextAction === '') {
      this.action = null;
    } else {
      this.action = nextAction;
    }
  }

  setDecimalPoint(): void {
    if (!this.newNumber.includes('.')) {
      this.newNumber += '.';
      this.display = `${this.display}${'.'}`;
    }
  }

  setMinusOperator(): void {
    this.firstNumber = Number(this.newNumber);
    this.newNumber = '0';

    if (this.action === null && this.secondNumber === null && this.firstNumber !== null) {
      this.firstNumber = this.firstNumber * (-1);
      this.display = this.firstNumber.toString();
      this.changedNewNumber = false;
    }
  }

  resetValues(): void {
    this.action = null;
    this.firstNumber = null;
    this.secondNumber = null;
    this.newNumber = '';
    this.display = '0'
    this.changedNewNumber = false;
  }

}
