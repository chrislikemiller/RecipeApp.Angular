import { Component } from "@angular/core";
import { ButtonComponent } from "../../shared/components/button.component";
import { BadgeComponent, CardComponent, InputComponent, LoadingComponent } from "../../shared/components";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
  imports: [ButtonComponent, LoadingComponent, BadgeComponent, CardComponent, InputComponent
  ]
})
export class TestComponent {
}