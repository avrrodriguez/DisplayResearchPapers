const Store = {
  list: [],
  query: "",
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == "list") {
      window.dispatchEvent(new Event("applistchange"));
    }
    return true;
  },
});

export default proxiedStore;
