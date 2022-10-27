import { Pipe, PipeTransform } from '@angular/core';
import { StatusLabelStatus } from '../components/common/status-label/status-label.component';
import { StepName } from '../services/api/nopaper/nopaper-api.types';

const stepToLabelStatusDict: { [key in StepName]: StatusLabelStatus } = {
  new: 'draft',
  nopaperPrepareFiles: 'draft',
  nopaperPreview: 'draft',
  nopaperPreviewBeforeOferta: 'draft',
  nopaperOfertaSenderPreview: 'draft',
  nopaperSenderSign: 'draft',
  nopaperReceiverPreview: 'pending',
  nopaperReceiverPreviewBeforeOferta: 'pending',
  nopaperOfertaReceiverPreview: 'pending',
  nopaperReceiverSigning: 'pending',
  nopaperEnd: 'signed',
  nopaperEndRead: 'signed',
  nopaperError: 'signed',
  nopaperErrorEnd: 'signed',
  nopaperDelete: 'signed',
  nopaperSenderCancel: 'signed',
  nopaperSenderCancelEnd: 'signed',
  nopaperSignRefused: 'signed',
  nopaperSignRefusedEnd: 'signed',
  nopaperSignRefusedRead: 'signed',
};

@Pipe({
  name: 'toLabelStatus',
})
export class StepToLabelStatusPipe implements PipeTransform {
  transform(stepName: StepName | null): StatusLabelStatus {
    if (!stepName) {
      return 'unknown';
    }

    return stepToLabelStatusDict[stepName];
  }
}
