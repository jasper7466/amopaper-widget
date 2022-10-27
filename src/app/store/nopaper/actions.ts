import { createAction, props } from '@ngrx/store';
import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';

// export const setPacketsIdsAction = createAction(
//   '[NOPAPER] set packed id',
//   props<{ packetsIds: number[] }>()
// );

export const setStepNameAction = createAction(
  '[NOPAPER] set status',
  props<{ stepName: StepName }>()
);

export const resetPacketIdAction = createAction('[NOPAPER] reset packed id');
export const resetStepNameAction = createAction('[NOPAPER] reset step name');
