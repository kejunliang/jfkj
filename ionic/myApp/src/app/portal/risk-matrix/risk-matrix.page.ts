import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RiskMatrixPageModule } from "./risk-matrix.module";
@Component({
  selector: 'app-risk-matrix',
  templateUrl: './risk-matrix.page.html',
  styleUrls: ['./risk-matrix.page.scss'],
})
export class RiskMatrixPage implements OnInit {
  public consequenceOptions = [];
  public likelihoodOptions = [];
  public riskMatrix: RiskMatrixPageModule;
  public seletedScore;
  public riskLevel;
  public levelColor;
  public levelDes;
  public Consequence;
  public Likelihood;
  public cellId;
  //public RankLegend;
  //rowOne=[];
  public YAxisOptions = [];
  public XAxisOptions = [];
  public riskMatrixSaveData;
  public rmTable;
  public rmtableTdWidth;
  public riskMatrixObj = {};
  constructor(
    public activeRoute: ActivatedRoute,
  ) {

    this.activeRoute.queryParams.subscribe(res => {
      if(res){
        this.riskMatrix = res.riskMatrixFrameData;
        this.riskMatrixSaveData = res.riskMatrixSaveData;
        if(this.riskMatrix){
          this.rmTable = this.riskMatrix.RMTable;
          this.YAxisOptions = this.riskMatrix.YAxisOptions;
          this.XAxisOptions = this.riskMatrix.XAxisOptions;
          this.rmtableTdWidth = 100 / this.riskMatrix.matrix_X + '%';
        }
      
      }
     
    })


  }

  ngOnInit() {
  }
  ionViewDidLoad() {

   
    
  };
  detectTdCellBg(){

  }
 

}
