import { Component, OnInit } from '@angular/core';
import {CommService} from '../../services/comm.service';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit {

  patterns: string[];


  constructor(private commService: CommService) { }

  ngOnInit() {
    this.commService.getPatterns().subscribe(patterns => {
      this.patterns = patterns;
    });
  }

  addPattern(pattern: string) {
    pattern = pattern.trim();
    if (!pattern) { return; }
    this.commService.addPattern(pattern).subscribe(() => {
      this.patterns.unshift(pattern);
    });
  }

  removePattern(pattern: string) {
    this.commService.removePattern(pattern).subscribe(() => {
      this.patterns.splice(this.patterns.indexOf(pattern), 1);
    });
  }

}
