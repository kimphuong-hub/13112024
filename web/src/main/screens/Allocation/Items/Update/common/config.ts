import { AllocationStatusType, ClarificationStatusType } from '~/main/features/allocation/items/types';

export const allowedStatus = [
  'allocation1',
  'allocation2',
  'clarification1',
  'clarification2',
  'verification',
  'checked'
];
export const allowedStatusSendClarification = ['allocation1', 'allocation2', 'verification'];
export const allowedStatusReplyClarification = ['clarification1', 'clarification2'];
export const allowedStatusCheckSystemAccount = ['clarification1', 'clarification2', 'verification'];
export const destinationStatusClarification: { [key in AllocationStatusType]: ClarificationStatusType } = {
  allocation1: 'clarification1',
  allocation2: 'clarification1',
  verification: 'clarification1'
};
