import { request } from '../helpers/request.js';

export const getOrder = ({ orderNumber }) => request(`orders/${orderNumber}`);