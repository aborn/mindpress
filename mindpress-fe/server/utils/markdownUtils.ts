import { v4 as uuidv4 } from 'uuid'

export function generatePermalinkHash() {
    const uuid = uuidv4();
    const permalink = uuid.replace(/-/g, '');
    return permalink.length > 16 ? permalink.substring(permalink.length - 16) : permalink
}