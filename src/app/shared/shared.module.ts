import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';

@NgModule({
    declarations: [
        HeaderComponent,
        InputWrapperComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderComponent,
        InputWrapperComponent
    ],
    providers: [],
})
export class SharedModule { }
