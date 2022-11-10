import randomString from "@/utilities/random-string";

export default function (props: { id: string | null | undefined }) {
  const id = computed(() => (props.id ? props.id : `identity_${randomString()}`));

  return id;
}
