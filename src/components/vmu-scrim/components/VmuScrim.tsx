import { StyleValue, Teleport, Transition } from "vue";
import prop from "vue-typed-props";

// Utilities
import emit from "@/utilities/emit";
import injectDefined from "@/utilities/inject-defined";

// Composables
import useArrayBind from "@/composables/use-array-bind";
import useRender from "@/composables/use-render";
import useId from "@/composables/use-id";

// Keys
import { SCRIM_UID_ARRAY } from "@/keys/scrim";

// Styles
import scss from "../scss/VmuScrim.module.scss";

export const VmuScrim = /* @__PURE__ */ defineComponent({
  name: "VmuScrim",
  inheritAttrs: false,
  props: {
    id: prop.string(),
    modelValue: prop.boolean(false),
    style: prop.generic<StyleValue>(),
    zIndex: prop.number(100),
    closable: prop.boolean()
  },
  emits: {
    "update:modelValue": emit<boolean>(),
    open: emit<void>()
  },
  setup(props, { slots, attrs, emit }) {
    const id = useId(props);

    const scrimUIDs = injectDefined(SCRIM_UID_ARRAY);

    const { index, bind, unbind } = useArrayBind(id, scrimUIDs);

    if (props.modelValue) bind();
    watch(
      () => props.modelValue,
      (value) => {
        if (value) bind();
        else unbind();
      }
    );

    const isLast = computed(() => index.value === scrimUIDs.value.length - 1);

    const style = computed<any>(() => [
      props.style,
      {
        zIndex: props.zIndex
      }
    ]);

    function onClick(e: MouseEvent) {
      e.stopPropagation();
      if (props.closable) emit("update:modelValue", false);
    }

    const scrimProps = computed(() => ({
      ...attrs,
      id: id.value,
      class: scss.scrim,
      style: style.value,
      inert: !isLast.value,
      role: "dialog",
      "aria-modal": true,
      "aria-hidden": !isLast.value,
      "aria-labelledby": `${id.value}-title`,
      "aria-describedby": `${id.value}-description`,
      onClick
    }));

    function onAfterEnter() {
      emit("open");
    }

    useRender(() => (
      <Teleport to="body">
        <Transition name="vmu-opacity" onAfterEnter={onAfterEnter}>
          {props.modelValue && <div {...scrimProps.value}>{slots.default?.()}</div>}
        </Transition>
      </Teleport>
    ));

    return {};
  }
});
