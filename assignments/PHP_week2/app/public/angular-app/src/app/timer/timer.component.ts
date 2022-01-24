import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';
import { SessionApiService } from '../session-api.service';
import { Session } from '../sessions/sessions.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Input()
  session!: Session;
  @Output()
  getSession = new EventEmitter<string>();

  scramble: string = '';
  time: string = '00:00';
  counter!: number;
  timerRef!: any;
  running: boolean = false;

  constructor(private sessionService: SessionApiService) {}

  ngOnInit(): void {
    this.generateScramble();
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      this.startTimer();
      event.preventDefault();
    }
  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      const startTime = Date.now() - 0;
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.msToDisplay();
      });
    } else {
      clearInterval(this.timerRef);
      this.sessionService
        .addSolve(this.session, {
          scramble: this.scramble,
          time: this.time,
        })
        .then(() => {
          this.getSession.emit(this.session._id);
          this.generateScramble();
        })
        .catch((error: any) => this.errorHandler(error));
    }
  }

  private errorHandler(error: any): void {
    clearInterval(this.timerRef);
    console.log('While getting sessions', error);
  }

  msToDisplay() {
    let seconds = (this.counter / 1000).toFixed(0);
    let milliseconds = ((this.counter % 1000) / 10).toFixed(0);
    // @ts-ignore: Unreachable code error
    this.time = (seconds < 10 ? '0' : '') + seconds + ':' + milliseconds;
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  generateScramble(): void {
    var moves: any = new Array();
    moves['r'] = new Array('R', "R'", 'R2');
    moves['l'] = new Array('L', "L'", 'L2');
    moves['u'] = new Array('U', "U'", 'U2');
    moves['d'] = new Array('D', "D'", 'D2');
    moves['f'] = new Array('F', "F'", 'F2');
    moves['b'] = new Array('B', "B'", 'B2');

    var limit = 25;
    var last = '';
    var newScramble = '';
    var keys: Array<string> = [];

    for (var i = 1; i <= limit; i++) {
      keys = new Array('r', 'l', 'u', 'd', 'f', 'b');
      this.shuffle(keys);
      while (last == keys[0]) {
        keys = this.shuffle(keys);
      }

      this.shuffle(moves[keys[0]]);
      let move = moves[keys[0]][0];
      newScramble += move + ' ';
      last = keys[0];
    }

    this.scramble = newScramble;
  }

  shuffle(o: string[]) {
    for (
      let j: number, x, i = o.length;
      i;
      // @ts-ignore: Unreachable code error
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }
}
