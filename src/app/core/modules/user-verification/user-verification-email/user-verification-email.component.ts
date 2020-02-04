import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiUserService} from '@api/api-user/api-user.service';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {switchMap, takeUntil} from 'rxjs/operators';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-user-verification-email',
  templateUrl: './user-verification-email.component.html',
  styleUrls: ['./user-verification-email.component.scss']
})
export class UserVerificationEmailComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  private emailConfirmed$ = new Subject<boolean>();
  @Input() stepper: MatHorizontalStepper;
  user: User;
  verified = false;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private apiUserService: ApiUserService) {
  }

  ngOnInit(): void {
    this.form = this.getForm();

    this.getUserUntilEmailWillBeConfirmed();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.apiUserService.emailRequestConfirm()
      .subscribe((res) => {
      }, (error) => {
      });
  }

  private getForm() {
    const formControls = {
      email: [{value: 'test@test.test', disabled: true}, [Validators.required]],
    };

    return this.fb.group({
      ...formControls
    });
  }

  private getUserUntilEmailWillBeConfirmed() {
    interval(3000).pipe(
      takeUntil(this.destroyed$),
      takeUntil(this.emailConfirmed$),
      switchMap(() => this.apiUserService.read(17282)),
    ).subscribe((user) => {
      this.user = user;
      if (user.confirmed_email) {
        this.emailConfirmed$.next(true);
        this.emailConfirmed$.complete();
        // this.form.disable();
        // this.verified = true;
      }
    }, (error) => {

    });
  }
}
