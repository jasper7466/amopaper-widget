import { createAction, props } from '@ngrx/store';
import { APP_CONTEXT_KEY } from '.';

export const appLoadAction = createAction(`[${APP_CONTEXT_KEY}] load`);

export const setAppInitAction = createAction(
  `[${APP_CONTEXT_KEY}] initialized`
);

export const setAppActivePacketIdAction = createAction(
  `[${APP_CONTEXT_KEY}] set active packet`,
  props<{ packetId: number }>()
);

export const setAppActiveLeadIdAction = createAction(
  `[${APP_CONTEXT_KEY}] set active lead`,
  props<{ leadId: number }>()
);
