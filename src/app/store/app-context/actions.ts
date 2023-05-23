import { createAction, props } from '@ngrx/store';
import { appContextKey } from '.';

export const appLoadAction = createAction(`[${appContextKey}] load`);

export const setAppInitAction = createAction(`[${appContextKey}] initialized`);

export const setAppActivePacketIdAction = createAction(
    `[${appContextKey}] set active packet`,
    props<{ packetId: number }>(),
);

export const setAppActiveLeadIdAction = createAction(
    `[${appContextKey}] set active lead`,
    props<{ leadId: number }>(),
);
