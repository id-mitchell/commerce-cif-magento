/*******************************************************************************
 *
 *    Copyright 2018 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/

'use strict';

const MagentoCartClient = require('./MagentoCartClient');
const InputValidator = require('@adobe/commerce-cif-common/input-validator');
const cartMapper = require('./CartMapper');
const ERROR_TYPE = require('./constants').ERROR_TYPE;

/**
 * This action deletes a cart billing address.
 *
 * @param   {string} args.MAGENTO_HOST          magento project key
 * @param   {string} args.id                    cart id;
 *
 * @return  {Promise}                           the cart without a billing address;
 */

function deleteBillingAddress(args) {
    const validator = new InputValidator(args, ERROR_TYPE);
    validator
        .checkArguments()
        .mandatoryParameter('id');
    if (validator.error) {
        return validator.buildErrorResponse();
    }

    const id = args.id;
    const cart = new MagentoCartClient(args, cartMapper.mapCart, 'guest-carts');
    const data = {
        address: {}
    }

    return cart.byId(id).updateBillingAddress(data).then(function () {
        return cart.byId(id).get();
    }).catch(error => {
        return cart.handleError(error);
    });
}

module.exports.main = deleteBillingAddress;
