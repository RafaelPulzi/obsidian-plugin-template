import { App, PluginSettingTab, Setting } from "obsidian";
import FoundationPlugin from "./main";

export interface FoundationPluginSettings {
  showRibbonIcon: boolean;
  showStatusBar: boolean;
  defaultCommandMessage: string;
  highlightColor: string;
}

export const DEFAULT_SETTINGS: FoundationPluginSettings = {
  showRibbonIcon: true,
  showStatusBar: true,
  defaultCommandMessage: "Hello from your Obsidian plugin!",
  highlightColor: "#7c3aed"
};

export class FoundationSettingTab extends PluginSettingTab {
  plugin: FoundationPlugin;

  constructor(app: App, plugin: FoundationPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("div", {
      cls: "obsidian-plugin-foundation-template__badge",
      text: "Foundation template"
    });

    new Setting(containerEl)
      .setName("Show ribbon icon")
      .setDesc("Displays a clickable icon in the left ribbon.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showRibbonIcon)
          .onChange(async (value) => {
            this.plugin.settings.showRibbonIcon = value;
            await this.plugin.saveSettings();
            await this.plugin.refreshUi();
          })
      );

    new Setting(containerEl)
      .setName("Show status bar")
      .setDesc("Displays a small status item at the bottom of the desktop app.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.showStatusBar)
          .onChange(async (value) => {
            this.plugin.settings.showStatusBar = value;
            await this.plugin.saveSettings();
            await this.plugin.refreshUi();
          })
      );

    new Setting(containerEl)
      .setName("Default command message")
      .setDesc("Message shown by the example command and ribbon action.")
      .addText((text) =>
        text
          .setPlaceholder("Type a short message")
          .setValue(this.plugin.settings.defaultCommandMessage)
          .onChange(async (value) => {
            this.plugin.settings.defaultCommandMessage = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Highlight color")
      .setDesc("A sample preference to demonstrate persisted visual settings.")
      .addText((text) =>
        text
          .setPlaceholder("#7c3aed")
          .setValue(this.plugin.settings.highlightColor)
          .onChange(async (value) => {
            this.plugin.settings.highlightColor = value;
            await this.plugin.saveSettings();
            this.plugin.applyCssVariables();
            this.display();
          })
      );

    const preview = containerEl.createDiv({
      cls: "obsidian-plugin-foundation-template__preview"
    });
    preview.style.setProperty(
      "border-color",
      this.plugin.settings.highlightColor || DEFAULT_SETTINGS.highlightColor
    );
    preview.createEl("strong", { text: "Preview" });
    preview.createEl("p", {
      text: `Saved accent color: ${this.plugin.settings.highlightColor}`
    });
  }
}
