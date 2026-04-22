import {
  App,
  Editor,
  MarkdownView,
  Modal,
  Notice,
  Platform,
  Plugin,
  PluginManifest
} from "obsidian";
import {
  DEFAULT_SETTINGS,
  FoundationPluginSettings,
  FoundationSettingTab
} from "./settings";

export default class FoundationPlugin extends Plugin {
  settings: FoundationPluginSettings;
  private statusBarItemEl: HTMLElement | null = null;
  private ribbonIconEl: HTMLElement | null = null;

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
    this.settings = DEFAULT_SETTINGS;
  }

  async onload(): Promise<void> {
    await this.loadSettings();
    this.applyCssVariables();

    // Example 1: Ribbon icon
    // This is often the fastest user entry point for simple plugin actions.
    this.createRibbonIconIfNeeded();

    // Example 2: Status bar item
    // Desktop only. Useful for lightweight status indicators.
    this.createStatusBarIfNeeded();

    // Example 3: Command that works anywhere
    this.addCommand({
      id: "show-configured-notice",
      name: "Show configured notice",
      callback: () => {
        new Notice(this.settings.defaultCommandMessage);
      }
    });

    // Example 4: Editor command
    // Adds text to the current editor selection or cursor position.
    this.addCommand({
      id: "insert-template-snippet",
      name: "Insert template snippet",
      editorCallback: (editor: Editor) => {
        const snippet = [
          "## Plugin snippet",
          "",
          `Message: ${this.settings.defaultCommandMessage}`,
          `Accent: ${this.settings.highlightColor}`
        ].join("\n");

        editor.replaceSelection(snippet);
        new Notice("Snippet inserted into the active note.");
      }
    });

    // Example 5: Conditional command
    // It only appears when an editable Markdown view is active.
    this.addCommand({
      id: "open-demo-modal",
      name: "Open demo modal",
      checkCallback: (checking: boolean) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);

        if (!markdownView) {
          return false;
        }

        if (!checking) {
          new DemoModal(this.app, this.settings.defaultCommandMessage).open();
        }

        return true;
      }
    });

    // Example 6: Settings tab
    // This is where user preferences live.
    this.addSettingTab(new FoundationSettingTab(this.app, this));

    // Example 7: Safe event registration
    // Obsidian will automatically clean this up when the plugin unloads.
    this.registerEvent(
      this.app.workspace.on("file-open", (file) => {
        if (file) {
          console.debug(`[${this.manifest.id}] opened file: ${file.path}`);
        }
      })
    );

    new Notice(`${this.manifest.name} loaded.`);
  }

  onunload(): void {
    this.removeInjectedCssVariables();
  }

  async refreshUi(): Promise<void> {
    this.ribbonIconEl?.remove();
    this.ribbonIconEl = null;

    this.statusBarItemEl?.remove();
    this.statusBarItemEl = null;

    this.createRibbonIconIfNeeded();
    this.createStatusBarIfNeeded();
  }

  applyCssVariables(): void {
    document.body.style.setProperty(
      `--${this.manifest.id}-accent`,
      this.settings.highlightColor
    );
  }

  private removeInjectedCssVariables(): void {
    document.body.style.removeProperty(`--${this.manifest.id}-accent`);
  }

  private createRibbonIconIfNeeded(): void {
    if (!this.settings.showRibbonIcon) {
      return;
    }

    this.ribbonIconEl = this.addRibbonIcon(
      "sparkles",
      "Show plugin notice",
      () => {
        new Notice(this.settings.defaultCommandMessage);
      }
    );

    this.ribbonIconEl.addClass("obsidian-plugin-foundation-template-ribbon");
  }

  private createStatusBarIfNeeded(): void {
    if (!this.settings.showStatusBar || Platform.isMobileApp) {
      return;
    }

    this.statusBarItemEl = this.addStatusBarItem();
    this.statusBarItemEl.setText(`${this.manifest.name} ready`);
  }

  async loadSettings(): Promise<void> {
    const loadedData = (await this.loadData()) as Partial<FoundationPluginSettings> | null;
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...loadedData
    };
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}

class DemoModal extends Modal {
  private readonly message: string;

  constructor(app: App, message: string) {
    super(app);
    this.message = message;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h2", { text: "Demo modal" });
    contentEl.createEl("p", {
      text: "Use this class as a starting point for confirmations, previews, and custom workflows."
    });
    contentEl.createEl("p", {
      text: `Configured message: ${this.message}`
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
