import uid from "@/utilities/uid";

export default function (props: { id?: string | null }) {
  const id = computed(() => (props.id ? props.id : uid()));

  return id;
}
