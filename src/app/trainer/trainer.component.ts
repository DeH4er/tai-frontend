import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DictService} from '../services/dict.service';
import {fromEvent, Observable, of, Subscription, throwError, TimeInterval, Timestamp} from 'rxjs';
import {catchError, filter, map, mergeMap, pluck, switchMap, tap, timeInterval, timestamp} from 'rxjs/operators';
import {Dict} from '../models/Dict';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

const WORDS_IN_SENTENCE = 15;

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.sass']
})
export class TrainerComponent implements OnDestroy, OnInit {

  keyPressObservable: Observable<any>;
  sentenceObservable: Observable<any>;

  keyPressSubscription: Subscription;
  sentenceSubscription: Subscription;

  sentenceChars: string[];

  currentKey: string;
  currentKeyIndex = 0;
  errorKeyIndexes = [];

  stats: any;

  constructor(
    private dictService: DictService,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      () => {
        this.keyPressObservable = this.createKeyPressObservable();
        this.keyPressSubscription = this.keyPressObservable.subscribe();
        this.getDict();
        this.initSprint();
        this.stats['speed'] = 0;
      },
      (err) => {this.auth.logout(); this.router.navigate(['/login'])}
    );
      }

  initSprint() {
    this.stats = Object.assign({}, this.stats,  {
      wrongKeyPressCount: {},
      errors: 0,
      keySpeed: {},
      validKeyPressIntervals: []
    });
    this.errorKeyIndexes = [];
  }

  ngOnDestroy() {
    //this.keyPressSubscription.unsubscribe();
    //this.sentenceSubscription.unsubscribe();
  }

  validKeyPressed(timeIntervalKey: TimeInterval<string>) {
    this.isLastValidKeyPressed() ? this.completeSprint() : this.getNextKey();
    this.saveKeySpeed(timeIntervalKey);
    this.stats.validKeyPressIntervals.push(timeIntervalKey.interval);
  }

  invalidKeyPressed(key: string) {
    if (this.stats.wrongKeyPressCount.hasOwnProperty(key)) {
      this.stats.wrongKeyPressCount[key]++;
    } else {
      this.stats.wrongKeyPressCount[key] = 1;
    } if (this.errorKeyIndexes[this.errorKeyIndexes.length] !== this.currentKeyIndex) { this.errorKeyIndexes.push(this.currentKeyIndex); } this.stats.errors++; } isKeyError(index: number): boolean { return !!this.errorKeyIndexes.find(i => i === index); } saveKeySpeed(timeIntervalKey: TimeInterval<string>) { if (this.stats.keySpeed.hasOwnProperty(timeIntervalKey.value)) {
      this.stats.keySpeed[timeIntervalKey.value].push(timeIntervalKey.interval);
    } else {
      this.stats.keySpeed[timeIntervalKey.value] = [timeIntervalKey.interval];
    }
  }

  updateSpeed() {
    const sum_time = this.stats.validKeyPressIntervals.reduce((a, b) => a + b, 0);
    this.stats.speed = (this.stats.validKeyPressIntervals.length / sum_time) * 1000 * 60;
    console.log(this.stats.speed);
  }

  isLastValidKeyPressed(): boolean {
    return this.currentKeyIndex === this.sentenceChars.length - 1;
  }

  completeSprint() {
    // update user stats
    this.updateSpeed();
    this.userService.pushStats(this.stats).subscribe();

    this.initSprint();
    // load from server
    this.getDict();
  }

  getNextKey() {
    this.currentKeyIndex++;
    this.currentKey = this.sentenceChars[this.currentKeyIndex];
  }
makeSentenceFromDict(dict: Dict): string { let i = 0; const random_words = []; for (; i < WORDS_IN_SENTENCE; i++) { random_words.push(dict.words[Math.floor(Math.random() * dict.words.length)]); }
    return random_words.join(' ');
  }

  createSentenceObservable(dict: Dict): Observable<string> {
    return new Observable(obs => {
      const sentence = this.makeSentenceFromDict(dict);
      obs.next(sentence);
    });
  }

  createKeyPressObservable() {
    return fromEvent<KeyboardEvent>(document, 'keypress')
      .pipe(
        pluck('key'),
        tap<string>(key => key !== this.currentKey ?
          this.invalidKeyPressed(key) : ''
        ),
        filter(key => key === this.currentKey),
        timeInterval(),
        tap(timeIntervalKey => this.validKeyPressed(timeIntervalKey))
      );

  }

  // get dict for current user's level
  getDict() {
    this.sentenceSubscription = this.dictService.getDict()
      .pipe(
        mergeMap(dict => {

          if (this.sentenceSubscription) {
            this.sentenceSubscription.unsubscribe();
          }

          if (this.sentenceSubscription) {
            this.sentenceSubscription.unsubscribe();
          }

          this.sentenceObservable = this.createSentenceObservable(dict);
          return this.sentenceObservable;
        }),
        tap(sentence => {
          this.sentenceChars = sentence.split('');
          this.currentKeyIndex = 0;
          this.currentKey = this.sentenceChars[0];
        })
      ).subscribe();
  }

}
