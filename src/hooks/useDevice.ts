import { useStore } from "@/store";
import { DeviceEnum } from "@/types/enum";
import { computed } from "vue";

const store = useStore();
const isMobile = computed(() => store.state.app.device === DeviceEnum.Mobile)
const isDesktop = computed(() => store.state.app.device === DeviceEnum.Desktop)

export function userDeivce () {
    return { isMobile, isDesktop };
}