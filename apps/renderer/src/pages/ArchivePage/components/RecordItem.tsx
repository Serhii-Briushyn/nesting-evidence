import React from "react";

import { DeleteButton } from "@shared/ui/DeleteButton/DeleteButton";

import type { NestingRecord } from "@shared/types/nesting";

type Props = {
  item: NestingRecord;
  index: number;
  onDelete: (id: string) => void;
};

export const RecordItem: React.FC<Props> = ({ item, index, onDelete }) => {
  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString("sk-SK", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <tr>
      <td>{index}</td>
      <td>{item.nestingId}</td>
      <td>{item.material.materialId}</td>
      <td>{item.leftovers.length ? item.leftovers.length : "bez zvyškov"}</td>
      <td>{formatTime(item.createdAt)}</td>
      <td>
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        />
      </td>
    </tr>
  );
};
