import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsSharedModule } from './atoms/atoms-shared.module';
import { MoleculesSharedModule } from './molecules/molecules-shared.module';
import { OrganismsSharedModule } from './organisms/organisms-shared.module';
import { TemplatesSharedModule } from './templates/templates-shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AtomsSharedModule,
    MoleculesSharedModule,
    OrganismsSharedModule,
    TemplatesSharedModule,
  ],
  exports: [
    AtomsSharedModule,
    MoleculesSharedModule,
    OrganismsSharedModule,
    TemplatesSharedModule,
  ],
})
export class ComponentsSharedModule {}
