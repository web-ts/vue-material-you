import { createVueMaterialYou } from "@/index";
import { mount } from "@vue/test-utils";
import { expect, describe, it, beforeEach } from "vitest";

import VmuDialog from ".";

describe("VmuDialog", () => {
  document.body.innerHTML = "<div id='app'></div>";
  // We need to load the plugin before we can test the icon component
  const createVMU = createVueMaterialYou({
    mountedOn: "app",
    color: "#ffffff",
    icon: {
      component: defineComponent({
        props: {},
        setup: (props) => () => h("div", props.theOverride ? props.theOverride : props.theKey)
      }),
      key: "theKey"
    }
  });

  beforeEach(() => {
    document.getElementById("app")!.textContent = "";
  });

  createVMU({} as any);

  it("should  not render anything", async () => {
    mount(VmuDialog, { props: { modelValue: false, title: "Test Title" }, attachTo: document.body });

    expect(document.body.innerText).toEqual("");
  });

  it("should render a dialog with a title", async () => {
    mount(VmuDialog, {
      props: { modelValue: true, title: "Test Title" },
      attachTo: document.body
    });

    expect(document.body.innerText).toMatch("Test Title");
  });

  it("should render a dialog with a description", async () => {
    mount(VmuDialog, {
      props: { modelValue: true, description: "Test Description" },
      attachTo: document.body
    });

    expect(document.body.innerText).toMatch("Test Description");
  });

  it("should render slot", async () => {
    mount(VmuDialog, {
      props: { modelValue: true },
      slots: { default: "Test Slot" },
      attachTo: document.body
    });

    expect(document.body.innerHTML).toMatch("Test Slot");
  });

  it("should render actions", async () => {
    mount(VmuDialog, {
      props: { modelValue: true, actions: [{ name: "Test", handler: () => 0 }] },
      attachTo: document.body
    });

    expect(document.body.innerHTML).toMatch("button");
  });

  it("should render icon", async () => {
    mount(VmuDialog, {
      props: { modelValue: true, icon: "Test Icon" },
      attachTo: document.body
    });

    expect(document.body.innerHTML).toMatch("Test Icon");
  });
});
