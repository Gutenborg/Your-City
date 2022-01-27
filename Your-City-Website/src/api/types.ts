export interface APIMongooseDocument {
  __v: number;
  _id: string;
}

export interface APIContactInformation {
  websites?: string[];
  phone?: string;
  email?: string;
}

export type APIDaysOfTheWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type HoursRange = string;

export interface APIError {
  message: string;
}

export interface APIBusinessModel {
  category: APICategory;
  contact?: APIContactInformation;
  description?: string;
  features?: string[];
  hours?: Record<APIDaysOfTheWeek, HoursRange>;
  images?: string[];
  logo?: string;
  manager?: APIManager;
  name: string;
  openedDate?: string;
  products?: APIProduct[];
  street?: string;
  tags?: string[];
}

export type APIBusiness = APIMongooseDocument & APIBusinessModel;

export interface APIManager {
  name?: string;
  managementType?: APIManagementType;
}

export type APIManagementType = 'franchise' | 'corporation' | 'owner';

export interface APIProduct {
  name: string;
}

export type APICategory =
  | 'retail'
  | 'restaurant'
  | 'distribution'
  | 'supply'
  | 'manufacturing'
  | 'service'
  | 'financial'
  | 'legal'
  | 'health';

export interface APILoginTokens {
  accessToken: string;
  refreshToken: string;
}

export interface APIUserModel {
  role: 'admin' | 'user' | 'reader';
  email: string;
  username: string;
}

export type APIUser = APIUserModel & APIMongooseDocument;

export interface APICityModel {
  businesses?: number;
  images?: string[];
  mayor?: string;
  name: string;
  population?: number;
}

export interface APIBusinessForm extends Pick<APIBusinessModel, 'name' | 'category'> {
  contactEmail?: APIContactInformation['email'];
  contactPhone?: APIContactInformation['phone'];
  contactWebsites?: string;
  description?: APIBusinessModel['description'];
  features?: string;
  hoursFriday?: HoursRange;
  hoursMonday?: HoursRange;
  hoursSaturday?: HoursRange;
  hoursSunday?: HoursRange;
  hoursThursday?: HoursRange;
  hoursTuesday?: HoursRange;
  hoursWednesday?: HoursRange;
  images?: any;
  logo?: any;
  managerManagementType?: APIManager['managementType'];
  managerName?: APIManager['name'];
  openedDate?: APIBusinessModel['openedDate'];
  street?: APIBusinessModel['street'];
  tags?: string;
}

export type APICity = APIMongooseDocument & APIBusinessModel;
<<<<<<< Updated upstream
=======

export interface APISeatModel {
  branch: APIBranch;
  description: string;
  fillMethod: APIFillMethod;
  incumbent: APIIncumbent;
  lastFilled: string;
  level: APILevel;
  name: string;
  nextFill: string;
  term: string;
}

export type APIBranch = 'legislative' | 'executive' | 'judicial';

export type APIFillMethod = 'appointed' | 'elected';

export interface APIIncumbent {
  name: string;
  servingSince: string;
  age: number;
  partyAffiliation: string;
  contact: APIContactInformation;
}

export type APILevel = 'local' | 'county' | 'state' | 'federal';

export interface APISeatForm
  extends Pick<
    APISeat,
    'name' | 'description' | 'fillMethod' | 'term' | 'level' | 'branch' | 'lastFilled' | 'nextFill'
  > {
  incumbentName: APIIncumbent['name'];
  incumbentServingSince: APIIncumbent['servingSince'];
  incumbentAge: APIIncumbent['age'];
  incumbentPartyAffiliation: APIIncumbent['partyAffiliation'];
  incumbentContactEmail: APIContactInformation['email'];
  incumbentContactPhone: APIContactInformation['phone'];
  incumbentContactWebsites: string;
}

export type APISeat = APIMongooseDocument & APISeatModel;
>>>>>>> Stashed changes
