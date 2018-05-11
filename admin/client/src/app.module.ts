import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { bootstrapper } from './bootstrap';
import { HeroDetailComponent } from './slatwall/components/herodetail.component';
import { slatwalladminmodule } from './slatwall/slatwalladmin.module';
import {AlertModule} from "../../../org/Hibachi/client/src/alert/alert.module";
import {DialogModule} from "../../../org/Hibachi/client/src/dialog/dialog.module";
import { LoggerModule } from "../../../org/Hibachi/client/src/logger/logger.module";
import { CoreModule }  from  "../../../org/Hibachi/client/src/core/core.module";
import { parseProvider,logProvider } from "./ajs-upgraded-providers"; 

@NgModule({
  providers: [
    parseProvider,
    logProvider
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    AlertModule,
    DialogModule,
    LoggerModule,
    CoreModule
  ],
  declarations:[
      HeroDetailComponent
  ],
  entryComponents: [
    HeroDetailComponent
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
     var bootstrapperInstance:any = new bootstrapper();
     bootstrapperInstance.fetchData().then(()=>{
         //console.log('test');
        this.upgrade.bootstrap(document.body,[slatwalladminmodule.name]);
        console.log(this.upgrade);
     });
  }
}