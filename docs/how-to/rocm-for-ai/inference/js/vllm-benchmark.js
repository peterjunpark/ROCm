function ready(proc) {
  if (document.readyState !== "loading") {
    proc();
  } else {
    document.addEventListener("DOMContentLoaded", proc);
  }
}

ready(() => {
  const ModelPicker = {
    SELECTORS: {
      CONTAINER: "#vllm-benchmark-ud-params-picker",
      MODEL_GROUP_BTN: 'div[data-param-k="model-group"][data-param-v]',
      MODEL_PARAM_BTN: 'div[data-param-k="model"][data-param-v]',
      MODEL_DOC: "div.model-doc",
    },
    CSS_CLASSES: {
      HIDDEN: "hidden",
    },
    ATTRIBUTES: {
      PARAM_KEY: "data-param-k",
      PARAM_VALUE: "data-param-v",
      PARAM_GROUP: "data-param-group",
      PARAM_STATE: "data-param-state",
    },

    // Cache DOM elements
    elements: {
      container: null,
      modelGroups: null,
      modelParams: null,
      modelDocs: null,
    },

    data: {
      availableModels: new Set(),
      modelsByGroup: new Map(),
      modelToGroupMap: new Map(),
      formattedModelClassMap: new Map(),
    },

    init() {
      this.elements.container = document.querySelector(
        this.SELECTORS.CONTAINER,
      );
      if (!this.elements.container) return;

      this.cacheDOMElements();
      if (!this.validateElements()) return;

      this.buildModelData();
      this.bindEvents();
      this.initializeState();
    },

    cacheDOMElements() {
      const { CONTAINER, MODEL_GROUP_BTN, MODEL_PARAM_BTN, MODEL_DOC } =
        this.SELECTORS;
      this.elements = {
        container: document.querySelector(CONTAINER),
        modelGroups: document.querySelectorAll(MODEL_GROUP_BTN),
        modelParams: document.querySelectorAll(MODEL_PARAM_BTN),
        modelDocs: document.querySelectorAll(MODEL_DOC),
      };
    },

    validateElements() {
      const { modelGroups, modelParams } = this.elements;
      if (!modelGroups.length || !modelParams.length) {
        console.warn("Model picker is missing required elements");
        return false;
      }
      return true;
    },

    buildModelData() {
      const { PARAM_VALUE, PARAM_GROUP } = this.ATTRIBUTES;

      this.elements.modelParams.forEach((model) => {
        const modelTag = model.getAttribute(PARAM_VALUE);
        const groupTag = model.getAttribute(PARAM_GROUP);

        if (!modelTag || !groupTag) return;

        this.data.availableModels.add(modelTag);
        this.data.modelToGroupMap.set(modelTag, groupTag);

        this.data.formattedModelClassMap.set(
          modelTag,
          modelTag.replace(/[^a-zA-Z0-9]/g, "-"),
        );

        if (!this.data.modelsByGroup.has(groupTag)) {
          this.data.modelsByGroup.set(groupTag, []);
        }
        this.data.modelsByGroup.get(groupTag).push(modelTag);
      });
    },

    bindEvents() {
      const handleInteraction = (event) => {
        const target = event.target.closest(`[${this.ATTRIBUTES.PARAM_KEY}]`);
        if (!target) return;

        const paramType = target.getAttribute(this.ATTRIBUTES.PARAM_KEY);
        const paramValue = target.getAttribute(this.ATTRIBUTES.PARAM_VALUE);

        if (paramType === "model") {
          const groupTag = target.getAttribute(this.ATTRIBUTES.PARAM_GROUP);
          if (groupTag) this.updateUI(paramValue, groupTag);
        } else if (paramType === "model-group") {
          const firstModelInGroup = this.data.modelsByGroup.get(paramValue)
            ?.[0];
          if (firstModelInGroup) this.updateUI(firstModelInGroup, paramValue);
        }
      };

      this.elements.container.addEventListener("click", handleInteraction);
      this.elements.container.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleInteraction(event);
        }
      });
    },

    updateUI(modelTag, groupTag) {
      const validModel = this.setModelSearchParam(modelTag);

      this.elements.modelGroups.forEach((group) => {
        const isSelected =
          group.getAttribute(this.ATTRIBUTES.PARAM_VALUE) === groupTag;
        group.setAttribute(
          this.ATTRIBUTES.PARAM_STATE,
          isSelected ? "selected" : "",
        );
        group.setAttribute("aria-selected", isSelected.toString());
      });

      this.elements.modelParams.forEach((model) => {
        const isInSelectedGroup =
          model.getAttribute(this.ATTRIBUTES.PARAM_GROUP) === groupTag;
        const isSelectedModel =
          model.getAttribute(this.ATTRIBUTES.PARAM_VALUE) === validModel;

        model.classList.toggle(this.CSS_CLASSES.HIDDEN, !isInSelectedGroup);
        model.setAttribute(
          this.ATTRIBUTES.PARAM_STATE,
          isSelectedModel ? "selected" : "",
        );
        model.setAttribute("aria-selected", isSelectedModel.toString());
      });

      const formattedClass = this.data.formattedModelClassMap.get(validModel);
      if (formattedClass) {
        this.elements.modelDocs.forEach((doc) => {
          doc.classList.toggle(
            this.CSS_CLASSES.HIDDEN,
            !doc.classList.contains(formattedClass),
          );
        });
      }
    },

    getModelSearchParam() {
      return new URLSearchParams(location.search).get("model");
    },

    setModelSearchParam(modelTag) {
      const defaultModel = [...this.data.availableModels][0];
      const model = this.data.availableModels.has(modelTag)
        ? modelTag
        : defaultModel;

      const searchParams = new URLSearchParams(location.search);
      searchParams.set("model", model);

      history.replaceState(
        {},
        "",
        `${location.pathname}?${searchParams.toString()}`,
      );
      return model;
    },

    initializeState() {
      const currentModel = this.getModelSearchParam();
      const validModel = this.setModelSearchParam(currentModel);

      const initialGroup = this.data.modelToGroupMap.get(validModel) ??
        [...this.data.modelsByGroup.keys()][0];

      if (initialGroup) {
        this.updateUI(validModel, initialGroup);
      }
    },
  };

  ModelPicker.init();
});
