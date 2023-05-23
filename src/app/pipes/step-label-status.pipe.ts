import { Pipe, PipeTransform } from '@angular/core';
import { TStatusLabelStatus } from '../components/atoms/status-label/status-label.component';
import { TPacketStatus } from '../interfaces/packet-status.type';

const stepToLabelStatusDict: { [key in TPacketStatus]: TStatusLabelStatus } = {
    new: 'draft',
    nopaperPrepareFiles: 'draft',
    nopaperPreview: 'sign',
    nopaperPreviewBeforeOferta: 'sign-offer',
    nopaperOfertaSenderPreview: 'sign-offer',
    nopaperSenderSign: 'pending',
    nopaperReceiverPreview: 'pending',
    nopaperReceiverPreviewBeforeOferta: 'pending',
    nopaperOfertaReceiverPreview: 'pending',
    nopaperReceiverSigning: 'pending',
    nopaperEnd: 'signed-single',
    nopaperEndRead: 'unknown',
    nopaperError: 'unknown',
    nopaperErrorEnd: 'unknown',
    nopaperDelete: 'unknown',
    nopaperSenderCancel: 'unknown',
    nopaperSenderCancelEnd: 'unknown',
    nopaperSignRefused: 'unknown',
    nopaperSignRefusedEnd: 'unknown',
    nopaperSignRefusedRead: 'unknown',
};

@Pipe({
    name: 'toLabelStatus',
})
export class StepToLabelStatusPipe implements PipeTransform {
    public transform(stepName: TPacketStatus | null): TStatusLabelStatus {
        if (!stepName) {
            return 'unknown';
        }

        if (!(stepName in stepToLabelStatusDict)) {
            return 'unknown';
        }

        return stepToLabelStatusDict[stepName];
    }
}
