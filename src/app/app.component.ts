import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Team, Match } from './models/Team';
import { TeamsService } from './services/teams.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(service: TeamsService) {
    service.getGroups().subscribe((group) => {
      this.groups = this.groups;
      this.populateKnockouts(this.groups); //conferir esse this
    });
  }
  title = 'world-cup-simulator-web';
  groups!: Team[][];
  roundOf16!: Match[];
  quarter!: Match[];
  semi!: Match[];
  final!: Match;
  winner!: Team;

  ngOnInit() {
    this.initRoundOf16();
    this.initQuarter();
    this.initSemi();
    this.initFinal();
    this.initWinner();
  }

  onMoveTeam(groups: any) {
    this.populateKnockouts(groups);
    this.initQuarter();
    this.initSemi();
    this.initFinal();
    this.initWinner();
  }

  changeQuarter(lastMatch: number, winner: Team) {}
  changeSemi(
    lastMatch: number,
    winner: Team,
    loser: Team | undefined = undefined
  ) {}
  changeFinal(
    lastMatch: number,
    winner: Team,
    loser: Team | undefined = undefined
  ) {}
  changeWinner(winner: Team) {}

  initRoundOf16() {
    this.roundOf16 = [];
    for (var i = 0; i < 8; i++) {
      this.roundOf16[i] = {
        teamOne: { name: '', img: '' },
        teamTwo: { name: '', img: '' },
      };
    }
  }
  initQuarter() {
    this.quarter = [];
    for (var i = 0; i < 4; i++) {
      this.quarter[i] = {
        teamOne: { name: '', img: '' },
        teamTwo: { name: '', img: '' },
      };
    }
  }
  initSemi() {
    this.semi = [];
    for (var i = 0; i < 2; i++) {
      this.semi[i] = {
        teamOne: { name: '', img: '' },
        teamTwo: { name: '', img: '' },
      };
    }
  }
  initFinal() {
    this.final = {
      teamOne: { name: '', img: '' },
      teamTwo: { name: '', img: '' },
    };
  }
  initWinner() {
    this.winner = { name: '', img: '' };
  }

  getBackgroundStyle(team: any) {
    return { 'background-image': 'url(' + team?.img + ')' };
  }
  populateKnockouts(groups: Team[][]) {
    this.roundOf16 = [];
    this.roundOf16.push({ teamOne: groups[0][1], teamTwo: groups[1][1] });
    this.roundOf16.push({ teamOne: groups[1][0], teamTwo: groups[0][1] });
    this.roundOf16.push({ teamOne: groups[2][0], teamTwo: groups[3][1] });
    this.roundOf16.push({ teamOne: groups[3][0], teamTwo: groups[2][1] });
    this.roundOf16.push({ teamOne: groups[4][0], teamTwo: groups[5][1] });
    this.roundOf16.push({ teamOne: groups[5][0], teamTwo: groups[4][1] });
    this.roundOf16.push({ teamOne: groups[6][0], teamTwo: groups[7][1] });
    this.roundOf16.push({ teamOne: groups[7][0], teamTwo: groups[6][1] });
  }
}
