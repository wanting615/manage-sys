import { Directive, DirectiveBinding } from "vue";
import { ButttonBindTypeEnum } from "@/types/enum";

export const button: Directive = {
  mounted(el: HTMLElement,binding: DirectiveBinding<ButttonBindTypeEnum>) {
    const _className = ButttonBindTypeEnum[binding.value] || '';
    _className && el.classList.add(_className);
  }
}