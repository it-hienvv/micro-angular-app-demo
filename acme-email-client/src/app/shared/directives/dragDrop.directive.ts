import {Directive, HostBinding, HostListener, Output, EventEmitter, Input } from "@angular/core";

@Directive({
    selector: "[appDrag]"
})
export class DragDirective {
    @Output() fileEvent = new EventEmitter<any>();
    @HostBinding("style.background") private background = "#f9f9f9";
    constructor() { }
    @HostListener("dragover", ["$event"]) onDragOver(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#eee";
    }

    @HostListener("dragleave", ["$event"]) onDragLeave(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#f9f9f9";
    }

    @HostListener('drop', ['$event']) onDrop(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f9f9f9';
        this.fileEvent.emit(evt.dataTransfer.files);
    }
}
