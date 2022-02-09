import React from "react";
import { useRouter } from "next/router";

type Props = {};

export default function RepairItem({}: Props) {
  const router = useRouter();
  const { id } = router.query;
  return <div>Post: {id}</div>;
}
