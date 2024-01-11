import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of, take, tap } from 'rxjs';
import { User } from '../../core/models/api.model';
import { SupportedOauthProviders } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'til-oauth-callback',
  standalone: true,
  imports: [],
  templateUrl: './oauth-callback.component.html',
  styleUrl: './oauth-callback.component.scss',
})
export class OauthCallbackComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const code = this.route.snapshot.queryParamMap.get('code');
    const provider = this.route.snapshot.paramMap.get(
      'provider',
    ) as SupportedOauthProviders;

    const isSupported = Object.values(SupportedOauthProviders).includes(
      provider,
    );

    if (!provider || !code || !isSupported) {
      this.router.navigate(['/']);
      return;
    }

    this.authService
      .loginWithProvider(code, provider)
      .pipe(
        take(1),
        tap((user: User) => {
          localStorage.setItem('isLoggedIn', '1');
          this.userService.setUser(user);
        }),
        catchError((e) => {
          localStorage.removeItem('isLoggedIn');
          return of(e);
        }),
        finalize(() => {
          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }
}