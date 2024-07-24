import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTreeComponent } from './form-tree.component';

describe('FormTreeComponent', () => {
  let component: FormTreeComponent;
  let fixture: ComponentFixture<FormTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
