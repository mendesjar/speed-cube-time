import SwipeToDelete from "react-swipe-to-delete-ios";

export function SwipeDelete({ children, height, onDelete, rest }: any) {
  return (
    <SwipeToDelete onDelete={onDelete} height={height} {...rest}>
      {children}
    </SwipeToDelete>
  );
}
