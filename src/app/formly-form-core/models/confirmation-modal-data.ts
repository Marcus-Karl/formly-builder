
export class ConfirmationModalData {
  public header: string;
  public body: string;
  public primaryActionText: string;
  public secondaryActionText: string;
  public disableClose: boolean;

  constructor(header: string, body: string, primaryActionText: string, secondaryActionText: string, disableClose: boolean = false) {
    this.header = header;
    this.body = body;
    this.primaryActionText = primaryActionText;
    this.secondaryActionText = secondaryActionText;
    this.disableClose = disableClose;
  }
}
