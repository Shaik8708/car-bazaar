import { Directive, Input, Output, EventEmitter, HostListener } from "@angular/core";

@Directive({
  selector: '[copy-clipboard]'
})
export class CopyClipboardDirective {

  @Input("copy-clipboard") payload: string;
  @Input("context") context: string;

  @Output("copied") copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener("click", ["$event"])
  public async onClick(event: MouseEvent): Promise<void> {
    event.preventDefault();

    if (!this.payload) return;

    try {
      await navigator.clipboard.writeText(this.payload);
      this.copied.emit(this.payload);
    } catch (error) {
      console.error("Failed to copy text", error);
    }
  }
}
