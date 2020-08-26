import React, { useEffect, useState } from "react";

export function WithExtraProps(component) {
  const Component = component;
  return function(props) {
    return <Component props="bla bla" {...props} />;
  };
}
