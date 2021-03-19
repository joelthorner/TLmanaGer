/**
 * @file Define zendesk api functions
 * @author joelthorner
 */
'use strict';

/**
 * Define user session api token
 * @type {string}
 */
const ZENDESK_API_TOKEN = document.querySelector('[name="csrf-token"]').getAttribute('content');

/**
 * Define api headers
 * @type {object}
 */
const ZENDESK_API_HEADERS = {
  'x-csrf-token': ZENDESK_API_TOKEN,
  'Content-Type': 'application/json'
};

/**
 * https://developer.zendesk.com/rest_api/docs/support/organizations#show-organization
 * @param {string} id - Organitzation id
 * @returns {object}
 */
async function api_showOrganization(id) {
  const rawResponse = await fetch(`/api/v2/organizations/${id}`, {
    method: 'GET',
    headers: ZENDESK_API_HEADERS,
  });
  let data = await rawResponse.json();
  return data;
};

/**
 * https://developer.zendesk.com/rest_api/docs/support/organizations#show-many-organizations
 * @param {string} idList - String list, organitzations id list
 * @returns {object}
 */
async function api_showManyOrganizations(idList) {
  const rawResponse = await fetch(`/api/v2/organizations/show_many?ids=${idList}`, {
    method: 'GET',
    headers: ZENDESK_API_HEADERS,
  });
  let data = await rawResponse.json();
  return data;
};

/**
 * https://developer.zendesk.com/rest_api/docs/support/organizations#update-organization
 * @param {string} id - Organitzation id
 * @param {object} obj - Organization fields to update object
 * @returns {object}
 */
async function api_updateOrganization(id, obj) {
  const rawResponse = await fetch(`/api/v2/organizations/${id}`, {
    method: 'PUT',
    headers: ZENDESK_API_HEADERS,
    body: JSON.stringify(obj)
  });
  let data = await rawResponse.json();
  return data;
};

/**
 * https://developer.zendesk.com/rest_api/docs/support/users#show-user
 * @param {string} id - User id
 * @returns {object}
 */
async function api_showUser(id) {
  const rawResponse = await fetch(`/api/v2/users/${id}`, {
    method: 'GET',
    headers: ZENDESK_API_HEADERS,
  });
  let data = await rawResponse.json();
  return data;
};