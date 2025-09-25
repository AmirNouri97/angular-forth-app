import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  clickCount = signal(0)
  clickCount$ = toObservable(this.clickCount)

interval$ = interval(1000)
intervalSignal = toSignal(this.interval$,{initialValue:0})
customInterval$ = new Observable((subscriber)=>{
  let timesExecuted = 0
  const interval = setInterval(()=>{
  if(timesExecuted>2){
    console.log(interval);
    clearInterval(interval)
    subscriber.complete()
    return
  }
  
    console.log('new value emitting ...');
    subscriber.next({message:'new Value'})
    timesExecuted++
  },1000)
})
  private destroyRef = inject(DestroyRef);
  // constructor(){
  //   effect(()=>{
  //     console.log(`you click ${this.clickCount()} times`);
      
  //   })
  // }
ngOnInit(): void {
//   const subscription = interval(1000).pipe(
//     map((val)=>val*2))
//     .subscribe({
//     next:(value)=>console.log(value)
//   });
// this.destroyRef.onDestroy(()=>{
//   subscription.unsubscribe();
// })
const subscription = this.clickCount$.subscribe({
  // next: (val)=>console.log(`you click ${this.clickCount()} ${val} times`)
  next: (val)=>console.log(`you click ${val} times`)
})
this.destroyRef.onDestroy(()=>{
  subscription.unsubscribe()
})

this.customInterval$.subscribe({
  next:(value)=>console.log(value)
  ,complete:()=>console.log('COMPLETED !')
  
})

}
onClick(){
  this.clickCount.update(prev=>prev+1)
}

}
