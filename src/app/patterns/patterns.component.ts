import { Component, OnInit } from '@angular/core';
import { Pattern } from '../types/pattern';
import { PATTERNS } from '../types/mock-patterns';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit {

  patterns: Pattern[] = PATTERNS;


  constructor() { }

  ngOnInit() {
  }

  addPattern(text: string) {
    text = text.trim();
    if (!text) { return; }
    this.patterns.unshift({text: text});
  }

  deletePattern(pattern: Pattern) {
    this.patterns.splice(this.patterns.indexOf(pattern), 1);
  }

}
