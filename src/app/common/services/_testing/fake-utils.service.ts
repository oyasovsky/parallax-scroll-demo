import { UtilsService } from '../utils/utils.service';
export { UtilsService } from '../utils/utils.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class FakeUtilsService implements UtilsService {
    find() {};
}